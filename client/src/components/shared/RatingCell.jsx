import { Rating } from "@progress/kendo-react-inputs";

export const RatingCell = (props) => {
  const field = props.field || "";
  const value = props.dataItem[field];

  if (props.rowType === "groupHeader") {
    return null;
  }

  return (
    <td {...props.tdProps} className="is-flex is-align-items-center">
      <Rating
        value={value === null ? "" : props.dataItem[field]}
        readonly={true}
        className="is-hidden-mobile"
      />
      <span className="is-hidden-tablet">
        {value || "-"}
      </span>

      <a href={`/movies/${props.dataItem.id}/rate`} className="button is-small ml-4">
        Rate
      </a>
    </td>
  );
};
