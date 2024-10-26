import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { blueGrey } from "@mui/material/colors";
import { Direction } from "../../enums/direction";
import { convertDirectionToDegrees } from "../../helpers/helper";

interface GridViewerProps {
  direction: Direction;
}

export default function GridViewer({ direction }: GridViewerProps) {
  const deg = convertDirectionToDegrees(direction);
  return (
    <AccessibilityNewIcon
      data-testid="marker"
      sx={{ transform: `rotate(${deg})`, color: blueGrey[900] }}
    />
  );
}
