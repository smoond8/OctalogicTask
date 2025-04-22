import {
    Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    minWidth: '600px',
    maxWidth: '650px',
    width: '100%',
    margin: '0 auto',
  }));


export default StyledCard;
