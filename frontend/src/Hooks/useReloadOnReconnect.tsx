import { useEffect, useRef } from "react";

const useReloadOnReconnect = () => {
  const wasOffline = useRef(false); 

  useEffect(() => {
    const handleOnline = () => {
      if (wasOffline.current) {
        wasOffline.current = false; 
        window.location.reload();
      }
    };

    const handleOffline = () => {
      wasOffline.current = true;
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
};

export default useReloadOnReconnect;
