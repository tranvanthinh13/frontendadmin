import React, { useState } from 'react'

function Description({ data }) {
    const [hide, setHide] = useState(true)
    return (
        <div>
            {hide ? data.slice(0, 250) + "" : data}
            <a
                className="btn btn-link text-danger text-gradient px-3 mb-0"
                onClick={() => {
                    setHide(!hide)
                }}
            >

                {hide ? 'Hiển thị thêm...' : 'Ẩn bớt'}

            </a>
        </div>
    )
}

export default Description
