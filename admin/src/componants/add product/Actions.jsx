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
            Product preview
          </button>

          <button type="submit" className="btn filled">
            Save Product
          </button>
        </div>
        </>
    )
}