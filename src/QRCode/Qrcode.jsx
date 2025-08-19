import { useState } from "react"
import "./Qrcode.css"


export const Qrcode = () => {

    const [img, setImg] = useState("");
    //if we use image from public folder, useState("qr_dummy.png")
    const [loading, setLoading] = useState(false);

    const [qrData, setQrData] = useState("https://movieinfos-rosy.vercel.app/");
    const [qrSize, setQrSize] = useState("150")



    const generateQR = async () => {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImg(url)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }

    }

    const downloadQR = () => {
        fetch(img)
            .then(res => res.blob())  //blob = binary;
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => {
                console.log(err);
            });
    }

    


    return (
        <>
            <div className="app-conatiner">
                <h1>QR CODE GENERATOR</h1>
                {loading && <p>Please wait...</p>}
                {img && <img src={img} alt="Qrcode" className="qr-image" />}
                <div>
                    <label htmlFor="dataInput" className="input-label">Data For QR Code</label>
                    <input type="text" id="dataInput" value={qrData} placeholder="Enter Data for QR Code" onChange={(e) => setQrData(e.target.value)} />

                    <label htmlFor="sizeInput" className="input-label">Image Size (e.g., 300)</label>
                    <input type="text" id="sizeInput" value={qrSize} placeholder="Enter Image Size" onChange={(e) => setQrSize(e.target.value)} />

                    <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
                    <button className="download-button" onClick={downloadQR}>Download QR Code</button>

                </div>
                <p className="footer">Designed By <span>Manikandan Rajendran</span></p>
            </div>




        </>
    )
}   