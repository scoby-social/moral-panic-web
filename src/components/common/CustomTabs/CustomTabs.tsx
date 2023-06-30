import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

export const CustomTabs = styled(Tabs)`
  & .Mui-selected {
    background-color: rgba(217, 217, 217, 0.1) !important;
    color: #fff !important;
  }
  & .MuiTabs-indicator {
    background: #beef00 !important;
  }
`;
