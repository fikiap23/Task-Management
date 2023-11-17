/* eslint-disable react/prop-types */
import "../../css/groupCard.css";
const GroupCard = ({ group }) => {
  // console.log(group)
  return (
    <div className="card">
      <div className="container" style={{ whiteSpace: "pre-line" }}>
        {group}
      </div>
    </div>
  );
};

export default GroupCard;
