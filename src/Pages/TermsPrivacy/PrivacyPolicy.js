import React, { useEffect } from 'react'
import TermsBanner from '../../Components/Common/TermsBanner/TermsBanner'
import PrivacyContent from '../../Components/TermsContent/PrivacyContent'


const PrivacyPolicy = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
        <TermsBanner heading={'Privacy Policy'}/>
        <PrivacyContent/>
    </>
  )
}

export default PrivacyPolicy