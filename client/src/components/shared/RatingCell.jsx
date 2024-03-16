import { Rating } from "@progress/kendo-react-inputs";

export const RatingCell = (props) => {
  const field = props.field || "";
  const value = props.dataItem[field];

  if (props.rowType === "groupHeader") {
    return null;
  }

  return (
    <td {...props.tdProps}>
      <Rating
        value={value === null ? "" : props.dataItem[field]}
        readonly={true}
        precision={"half"}
      />

      <button onClick={() => window.location.href = `/movies/${props.dataItem.id}/rate`}>Rate movie</button>
      {" "}
    </td>
  );
};
