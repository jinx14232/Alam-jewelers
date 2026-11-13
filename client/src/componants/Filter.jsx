

export default function Filter(props) {
    return (
        <div className="filters">

            {
                props.filters.map((filter, idx) => (
                    <div className="filter-cont" key={idx}>

                        <label htmlFor="filter-select">
                            Select {filter.name}
                        </label>
                        <select
                            className="filter-select"
                            name="filter"
                            value={filter.value}
                            onChange={(e) => filter.setFilter(e.currentTarget.value)}
                        >
                            <option value="-1">All</option>

                            {
                                filter.options.map((opt, id) => (
                                    <option
                                        key={id}
                                        value={opt.id}
                                    >
                                        {opt.name}
                                    </option>
                                ))

                            }

                        </select>
                    </div>
                ))
            }

        </div>

    )
}