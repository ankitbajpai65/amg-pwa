import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const ScanNow = () => {
  const [startScan, setStartScan] = useState(true);
  const [scanRes, setScanRes] = useState("");

  const camRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (startScan === true) {
      let cameraId: string = "";
      if (camRef.current === null) {
        camRef.current = new Html5Qrcode("reader");
      }

      const html5QrCode = camRef.current;
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            cameraId = devices[1].id;
            console.log({ cameraId });
            handleStart(cameraId, html5QrCode);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [startScan]);

  const handleStart = (cameraId: string, scannerInstance: Html5Qrcode) => {
    console.log("START");
    scannerInstance
      .start(
        cameraId,
        {
          fps: 5,
          qrbox: 250,
        },
        (qrCodeMessage) => {
          console.log(`QR Code detected: ${qrCodeMessage}`);
          handleStop(scannerInstance);
          setScanRes(qrCodeMessage);
        },
        (errorMessage) => {
          console.log(`QR Code no longer in front of camera.${errorMessage}`);
          scannerInstance.clear();
        }
      )
      .catch((err) => {
        console.log(`Unable to start scanning, error: ${err}`);
      });
    setTimeout(() => {
      handleStop(scannerInstance);
    }, 10000);
  };

  const handleStop = (scannerInstance: Html5Qrcode) => {
    scannerInstance
      .stop()
      .then((ignore) => {
        // QR Code scanning is stopped.
        console.log(`QR Code scanning stopped.${ignore}`);
        setStartScan(false);
      })
      .catch((err) => {
        // Stop failed, handle it.
        console.log(`Unable to stop scanning.${err}`);
      });
  };

  return (
    <div className="flex flex-col justify-center grow">
      <div className="h-3/5 text-center">
        {startScan ? (
          <div id="reader"></div>
        ) : scanRes === "" ? (
          <div>No Scan</div>
        ) : (
          <div>{scanRes}</div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className={`${
            startScan ? "hidden" : "block"
          } rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white
      font-medium mb-2 hover:bg-red-500 hover:border hover:border-black
      focus:bg-red-500 active:bg-red-700`}
          onClick={() => setStartScan(true)}
        >
          Re-Scan
        </button>
      </div>
    </div>
  );
};
export default ScanNow;
