import React from 'react'

const TermsPrivacyRow = ({type, title, details, detailsList, nestedList}) => {
    const lng = localStorage.getItem("language");
  return (
    <>
        <p className="text-lightgrey text-[38px] font-[AraHamahBold]">
            {title}
        </p>
        {
            type == 'list' ?
            <ul style={{listStyle: "disc", 
                paddingRight: lng != 'en' ? "18px" : null,
                paddingLeft: lng == 'en' ? "18px" : null,
            }}>
                {
                    detailsList.map((item, index) => {
                        return(
                            <li key={index}>
                                <p className="text-lightgrey text-[28px] font-[AraHamah1964]">
                                    {item}
                                </p>
                                {
                                    (nestedList && nestedList.index == index) ? <ul style={{listStyle: "circle", 
                                        paddingRight: lng != 'en' ? "16px" : null,
                                        paddingLeft: lng == 'en' ? "16px" : null,
                                    }}>{
                                        nestedList.list.map((nestedItem, nestedIndex) => {
                                            return(                                            
                                                <li key={nestedIndex}>
                                                    <p className="text-lightgrey text-[28px] font-[AraHamah1964]">
                                                        {nestedItem}
                                                    </p>
                                                </li>                
                                            )
                                        })
                                    }</ul>: null
                                }
                            </li>
                        )
                    })
                }
            </ul>
            : <p className="text-lightgrey text-[28px] font-[AraHamah1964] ">
                {details}
            </p>
        }
    </>
  )
}

export default TermsPrivacyRow