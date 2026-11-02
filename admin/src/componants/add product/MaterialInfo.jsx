
export default function MaterialInfo({ form, setForm, metals, selectedMetals, changeSelectedMetals }) {

    const handleMetalCheck = (mat) => {
        console.log(selectedMetals.includes(mat))
        changeSelectedMetals((prevSelected) =>

            prevSelected.includes(mat)
                ? prevSelected.filter((item) => item.id !== mat.id)
                : [...prevSelected, mat]

        )
    }

    function handleMetalInfoChange(metalIndex, detailIndex, field, value) {
        
        setForm(prev =>
            prev.map((metal, i) =>
                i === metalIndex
                    ? {
                        ...metal,
                        details: metal.details.map((detail, j) =>
                            j === detailIndex
                                ? { ...detail, [field]: value }
                                : detail
                        )
                    }
                    : metal
            )
        )
    }


    function addMetalDetailField(metalIndex) {

        setForm(prev =>
            prev.map((metal, i) =>
                i == metalIndex ?
                    {
                        ...metal,
                        details: [
                            ...metal.details,
                            { field: '', value: '' }
                        ]
                    }
                    : metal
            )
        )

    }

    return (
        <>
            <section className="form-section">
                <h2>Metal Information</h2>

                <div className="metal-selection">
                    <p>Choose metals from following:</p>
                    <div className="metals">
                        {metals.map((metal) => (
                            <div key={metal.name} className="metal">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMetals.forEach(mat => mat.id == metal.id)}
                                        onChange={() => handleMetalCheck(metal)}
                                    />
                                    <span>{metal.name}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedMetals.map((metal, index) => (
                    <section key={index} className="form-section">
                        <h2 className="partition sub-heading" >{metal.name} Details & Pricing</h2>

                        {
                            form.map((metalInfo, metalIdx) => {

                                return (
                                    metalInfo.metal_id == metal.id &&

                                    <section className="form-grid" key={metalIdx}>

                                        {metalInfo.details.map((detail, detailIdx) => (
                                            <>
                                                <div key={detailIdx + metalIdx + metalInfo.id} className="form-field">

                                                    <label className="jost" htmlFor="field">
                                                        Field
                                                    </label>

                                                    <input
                                                        id="field"
                                                        name="field"
                                                        placeholder="e.g Weight"
                                                        value={detail.field}
                                                        onChange={(e) => handleMetalInfoChange(metalIdx, detailIdx, 'field', e.target.value)}
                                                    />
                                                </div>
                                                <div key={detailIdx + metalIdx} className="form-field">

                                                    <label className="jost" htmlFor="value">
                                                        Value
                                                    </label>
                                                    <input
                                                        id="value"
                                                        name="value"
                                                        placeholder="1.5g"
                                                        value={detail.value}
                                                        onChange={(e) => handleMetalInfoChange(metalIdx, detailIdx, 'value', e.target.value)}

                                                    />

                                                </div>
                                            </>
                                        ))}

                                    </section>
                                )
                            })
                        }
                        <button className="btn filled" style={{ marginTop: '20px' }} onClick={(e) => { e.preventDefault(); addMetalDetailField(index) }}>
                            + Add Field
                        </button>

                    </section>
                ))}

            </section>


        </>
    )
}


