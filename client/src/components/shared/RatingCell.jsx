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
      />
      <a href={`/movies/${props.dataItem.id}/rate`}>
        <button>Rate movie</button>
      </a>{" "}
    </td>
  );
};
