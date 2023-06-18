'use client';
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from 'file-saver';
import { AiFillGithub } from 'react-icons/ai';
import { toPng } from 'html-to-image';


export default function MainPage() {
  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA/WPA2");
  const ref = React.useRef(null);

  const generateQRCode = () => {
    const wifiCredentials = `WIFI:S:${ssid};T:${encryption};P:${password};;`;

    return wifiCredentials;
  };

  const handleDownload = () => {
    const qrCodeValue = generateQRCode();
    const canvas = ref?.current;
    if (canvas === null) {
      alert('500 server error');
      return;
    }
    toPng(canvas)
      .then(function (blob) {
        saveAs(blob, 'wifi-qr-code.png');
      });
  }

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 min-h-screen flex items-center justify-center flex-col">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl mb-6 font-bold text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Share your Wi-Fi credentials with a QR code
        </h1>
        <form className="mb-4">
          <div className="mb-2">
            <label htmlFor="ssid" className="block text-lg font-bold">
              SSID (Network Name):
            </label>
            <input
              type="text"
              id="ssid"
              value={ssid}
              onChange={(e) => setSSID(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-lg font-bold">
              Password:
            </label>
            <input
              
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="encryption" className="block text-lg font-bold">
              Encryption:
            </label>
            <select
              id="encryption"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            >
              <option value="WPA/WPA2">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="None">None</option>
            </select>
          </div>
        </form>
        <div className="text-center">
          <h2 className="text-2xl mb-2 font-bold">QR Code:</h2>
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-60 h-60 rounded-lg mx-auto flex items-center justify-center selectMeClassName">
            <QRCode ref={ref} value={generateQRCode()} size={220} id={'canvas'} />
          </div>
          <button
            className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download QR Code
          </button>
        </div>
      </div>
      <a
        href={'https://github.com/Ellis-Brown/contact-qr-code'}
        className="text-gray-200 rounded-lg bg-gradient-to-r from-black to-gray-500 hover:bg-gray-600 px-4 py-2 my-4"
      >
        <div className="flex flex-row">
          <AiFillGithub size={30} />&nbsp; Star on GitHub
        </div>
      </a>
    </div>
  );
};
