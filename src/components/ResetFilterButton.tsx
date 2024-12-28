import { Button } from "antd";
import { useNavigate } from "react-router";

interface ResetFilterButtonProps {
  refetch: () => void;
}

const ResetFilterButton = ({ refetch }: ResetFilterButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        refetch();
        navigate({
          pathname: ".",
          search: "",
          hash: "",
        });
      }}
    >
      Reset
    </Button>
  );
};

export default ResetFilterButton;
