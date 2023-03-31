import React, {useState} from "react";
import axiosInstance from "./axios";

const Main = () => {
   const [formData, setFormData] = useState({});
   const [responseData, setResponseData] = useState({})
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (event) => {
       event.preventDefault();

       setResponseData({});
       setIsLoading(true);

       const response = await axiosInstance.post('/', formData);

       setResponseData(response.data);
       setIsLoading(false)
   }

   const handleChange = (event) => {
       setFormData({
           ...formData,
           [event.target.name]: event.target.value
       });
   }

   return (
     <div className="container text-center vh-100 d-flex flex-column justify-content-center">
        <p className="fs-1 text-primary pb-4">Play around with our sentiment analyzer:</p>
        <div  className="row d-flex justify-content-center ">
            <div className="col-12 col-md-5 border-end p-4 bg-light">
                <p className="fs-4">Test with your own text</p>
                <form onSubmit={handleSubmit}>
                    <textarea className="form-control" name="twit" id="twitArea" cols="40" rows="6" onChange={handleChange}></textarea><br/>
                    <button className="btn btn-primary">Classify</button>
                </form>
            </div>
            <div className="col-12 col-md-5 p-4 bg-light d-flex flex-column justify-content-between">
                <p className="fs-4">Result</p>
                <span className={`h3 fw-bold ${
                    responseData?.key === 2 ? "text-success" : 
                    responseData?.key === 1 ? "text-primary" :
                    responseData?.key === 0 ? "text-danger" : ""
                }`}>
                    {isLoading ? 'Loading...' : responseData?.sentiment}
                </span>
                <div className="h-25"></div>
            </div>
        </div>
     </div>
   );
};

export default Main;
