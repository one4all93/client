import React from 'react'

const ErrorBanner = ({msg}) => {
    let errMsg = msg || "에러가 발생했습니다.";
    return (
        <div
            style={{ backgroundColor : 'red' }}
        >{errMsg}</div>
    )
}

export default ErrorBanner