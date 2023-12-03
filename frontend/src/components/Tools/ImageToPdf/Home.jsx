import { useContext } from 'react'
import { GeneralContext } from '../ImageToPdf/utils/GeneralContextProvider.jsx'
import utils from '../ImageToPdf/utils/utils.jsx'
import Popup from './Popup.jsx'
// import Info from "./Info.jsx";
import Carousel from './Carousel.jsx'

const Utils = new utils()

const Home = () => {
  const { files, setFiles, popup, setPopup } = useContext(GeneralContext)

  const handleFile = (e) => {
    let filesArray = [...files]

    ;[...e.target.files].forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        filesArray.push(file)
      }
    })

    if (filesArray.length <= 20) {
      setFiles(filesArray)
    } else {
      setPopup({
        show: true,
        message: 'Exceeded limit of 20 images.',
        timeout: 5,
      })
    }
  }

  const clearQueue = () => {
    if (files.length > 0) {
      setFiles(() => [])
      setPopup({ show: true, message: 'Queue cleared.', timeout: 5 })
    }
  }

  const download = () => {
    if (files.length > 0) {
      setPopup({
        show: true,
        message: 'Converting images to PDF...',
        timeout: 60,
      })
      Utils.generatePDF(files).then(() =>
        setPopup({ show: true, message: 'Download completed!', timeout: 5 })
      )
    } else {
      setPopup({ show: true, message: 'Please upload images!', timeout: 5 })
    }
  }

  return (
    <>
      {popup.show ? <Popup /> : ''}
      <div className="container">
        <h1 className="title-pdf">FITUR IMAGE TO PDF</h1>
        <div className="box">
          <div className="wrapper">
            <span className="text">+</span>
            <p className="prompt">
              Click or drag and drop files here to upload.
            </p>
            <p>MAX 20</p>
            <input
              id="file-upload"
              type={'file'}
              multiple={'multiple'}
              accept={'image/png, image/jpeg'}
              onChange={handleFile}
            />
          </div>
        </div>
        <Carousel files={files} />
        <div className="button_container">
          <button className="action clear_queue" onClick={clearQueue}>
            Clear queue
          </button>
          <button className="action download" onClick={download}>
            Download [PDF]
          </button>
        </div>
        {/* <Info /> */}
        <a href="https://github.com/anshuthopsee/image2pdf">
          Thanks to anshuthopsee
        </a>
      </div>
    </>
  )
}

export default Home
