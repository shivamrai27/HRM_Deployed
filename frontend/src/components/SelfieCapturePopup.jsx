import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Snackbar, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import Webcam from 'react-webcam';
import axios from 'axios';
import PropTypes from 'prop-types';

const SelfieCapturePopup = ({ isOpen, onClose, endpoint, title, onSuccess }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      setLocation(null);
      setError(null);
      getLocation();
    }
  }, [isOpen]);

  const getLocation = useCallback(() => {
    setIsGettingLocation(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Failed to get location. Please enable location services.");
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
    }
  }, []);

  const capture = useCallback(() => {
    if (!location) {
      setError("Please wait for location to be captured");
      return;
    }
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    } else {
      setError("Failed to capture image. Please ensure camera access is granted.");
    }
  }, [location]);

  const retake = () => {
    setCapturedImage(null);
  };

  const confirm = async () => {
    if (!capturedImage) {
      setError("Please capture an image first.");
      return;
    }

    if (!location) {
      setError("Please wait for location to be captured.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) {
        setError('User is not logged in. Please log in again.');
        return;
      }

      const response = await axios.post(endpoint, {
        userId: user._id,
        location: location,
        photoUrl: capturedImage,
      }, {
        withCredentials: true
      });

      // Call onSuccess only after successful submission
      onSuccess();
      onClose();
    } catch (error) {
      console.error(`${title} failed:`, error);
      setError(`Failed to ${title.toLowerCase()}: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={(event, reason) => {
        // Prevent closing on backdrop click
        if (reason === 'backdropClick') return;
      }}
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle className="flex justify-between items-center">
        <span>{title}</span>
        <IconButton 
          onClick={onClose}
          className="hover:bg-gray-100 rounded-full p-2"
          disabled={isSubmitting}
        >
          <X className="h-6 w-6" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center justify-center h-[700px]">
          <div className="w-[626px] h-[528px] rounded-lg overflow-hidden mb-4">
            {capturedImage ? (
              <img src={capturedImage} alt="captured" className="w-full h-full object-cover" />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 626, height: 528 }}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-[352px] text-center mb-6">
            <p className="text-xl font-medium mb-4">
              {capturedImage ? `Confirm your ${title.toLowerCase()}` : `Capture your ${title} Selfie`}
            </p>
            {isGettingLocation && (
              <p className="text-sm text-gray-600 mb-2">Getting location...</p>
            )}
            {!capturedImage && (
              <button 
                onClick={capture}
                disabled={!location || isGettingLocation || isSubmitting}
                className={`px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {isGettingLocation ? 'Getting Location...' : 'Capture'}
              </button>
            )}
          </div>
          {capturedImage && (
            <div className="flex gap-6">
              <button 
                onClick={retake}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Retake
              </button>
              <button 
                onClick={confirm}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm'}
              </button>
            </div>
          )}
        </div>
      </DialogContent>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Dialog>
  );
};

SelfieCapturePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  endpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default SelfieCapturePopup;