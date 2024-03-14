// Response Code: 200
// Success

// Response Code: 400
// Error message
// Redirect URL:--> Redirect the user to the url
import { toast } from 'react-toastify';
let Success = (data) => {
    toast.Success(data.message);
};
let Error = (data) => {
    toast.Error(data.message);
};
let ResponsePipeline = (data) => {
    if (data.Status == 'S') {
        Success(data);
    } else if (data.Status == 'B') {
        Error(data);
    }
};

module.exports = { ResponsePipeline };
