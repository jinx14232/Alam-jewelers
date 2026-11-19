
export default function BasicInfo({form, setForm, categoriesGroup}) {
    const genderText = {
    'women': 'Women',
    'men': 'Men',
    'newBorn': 'New Born'
  }

  function handleBasicInfoChange(e) {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'gender' ? { category_id: '' } : {})
        }))
    }

    return (
        <>
            <section className="form-section">
                <h2 className="partition">Basic Information</h2>

                <div className="form-grid">

                    <div className="form-field">
                        <label className="jost" htmlFor="name">
                            Product Name <span className="required">*</span>
                        </label>

                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleBasicInfoChange}
                            placeholder="e.g. Royal Gold Ring"
                            required
                        />

                    </div>

                    <div className="form-field">
                        <label className="jost" htmlFor="code">
                            Product Code <span className="required">*</span>
                        </label>

                        <input
                            id="code"
                            name="code"
                            value={form.code}
                            onChange={handleBasicInfoChange}
                            placeholder="e.g. AJ101"
                            required
                        />

                    </div>

                    <div className="form-field">
                        <label className="jost" htmlFor="gender">
                            Collection <span>*</span>
                        </label>

                        <select
                            id="gender"
                            name="gender"
                            value={form.gender}
                            onChange={handleBasicInfoChange}
                            required
                        >
                            <option value="">Select collection</option>
                            {
                                Object.keys(categoriesGroup).map((genKey, id) => (

                                    <option
                                        key={id}
                                        value={genKey}
                                    >
                                        {genderText[genKey]}
                                    </option>

                                ))
                            }

                        </select>
                    </div>

                    <div className="form-field">
                        <label className="jost" htmlFor="category">
                            Category <span>*</span>
                        </label>

                        <select
                            id="category"
                            name="category_id"
                            value={form.category_id}
                            onChange={handleBasicInfoChange}
                            disabled={!form.gender}
                            required
                        >
                            <option value="">
                                {form.gender
                                    ? 'Select category'
                                    : 'Select collection first'}
                            </option>

                            {categoriesGroup[form.gender]?.map(
                                category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="form-field">
                        <label className="jost" htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleBasicInfoChange}
                            placeholder="Describe the design and craftsmanship..."
                            maxLength={500}
                            rows={6}
                        />

                        <small className="character-count muted">
                            {form.description.length}/500
                        </small>

                    </div>
                
                </div>
            </section>

        </>
    )
}