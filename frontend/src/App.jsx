import './App.css';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MultiStepForm />
      <ToastContainer position="top-right" autoClose={3000} />
    </LocalizationProvider>
  )
}

export default App
