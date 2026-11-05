export default function Actions({ handleCancel, handlePreview}) {
    return (
        <>
        <div className="form-actions">
          <button
            type="button"
            className="btn simple"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn filled"
            onClick={handlePreview}

          >
            Item preview
          </button>

          <button type="submit" className="btn filled">
            Save Item
          </button>
        </div>
        </>
    )
}