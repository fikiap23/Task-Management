import GeneralContextProvider from "../components/Tools/ImageToPdf/utils/GeneralContextProvider.jsx";
import Home from "../components/Tools/ImageToPdf/Home.jsx";
import "../css/imageToPdf.css";

function ImageToPdf() {
  return (
    <div className="App">
      <GeneralContextProvider>
        <Home />
      </GeneralContextProvider>
    </div>
  );
}

export default ImageToPdf;
