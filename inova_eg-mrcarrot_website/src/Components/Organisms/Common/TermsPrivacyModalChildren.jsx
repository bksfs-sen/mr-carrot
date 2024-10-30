import React from 'react'
import HeaderPanel from '../../Atoms/HeaderPanel/HeaderPanel'
import { withTranslation } from 'react-i18next'
import TermsPrivacyRow from '../../Molecules/Auth/TermsPrivacyRow/TermsPrivacyRow'

const TermsPrivacyModalChildren = ({t}) => {
  return (
    <>
        <div className="align-middle lg:w-[84%] w-[90%] mx-auto">
          <HeaderPanel
            description={t("termsAndPrivacyPolicy.introductionDescription")}
          />
        </div>

        <div className="lg:w-[84%] w-[90%] mx-auto">                  
          <p className="text-lightgrey text-[42px] font-[AraHamahBold]">
            {t("termsAndPrivacyPolicy.privacyPolicy")}
          </p>

          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.collectionOfInformation")}
            detailsList={[
              t("termsAndPrivacyPolicy.collectionOfInformationDescription1"),
              t("termsAndPrivacyPolicy.collectionOfInformationDescription2")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.useOfInformation")}
            detailsList={[
              t("termsAndPrivacyPolicy.useOfInformationDescription1"),
              t("termsAndPrivacyPolicy.useOfInformationDescription2")
            ]}
          />
          <br />
          <TermsPrivacyRow
            title={t("termsAndPrivacyPolicy.sharingInformation")}
            details={t("termsAndPrivacyPolicy.sharingInformationDescription")}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.informationSecurity")}
            detailsList={[
              t("termsAndPrivacyPolicy.informationSecurityDescription1"),
              t("termsAndPrivacyPolicy.informationSecurityDescription2")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.userRights")}
            detailsList={[
              t("termsAndPrivacyPolicy.userRightsDescription1"),
              t("termsAndPrivacyPolicy.userRightsDescription2")
            ]}
          />

          <br /><br />
          <p className="text-lightgrey text-[42px] font-[AraHamahBold]">
            {t("termsAndPrivacyPolicy.termsAndConditions")}
          </p>

          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.registrationAndAccount")}
            detailsList={[
              t("termsAndPrivacyPolicy.registrationAndAccountDescription1"),
              t("termsAndPrivacyPolicy.registrationAndAccountDescription2")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.ordersAndPayment")}
            detailsList={[
              t("termsAndPrivacyPolicy.ordersAndPaymentDescription1"),
              t("termsAndPrivacyPolicy.ordersAndPaymentDescription2")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.deliveryAndReceipt")}
            detailsList={[
              t("termsAndPrivacyPolicy.deliveryAndReceiptDescription1"),
              t("termsAndPrivacyPolicy.deliveryAndReceiptDescription2")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.cancellationAndRefund")}
            detailsList={[
              t("termsAndPrivacyPolicy.cancellationAndRefundDescription1"),
              t("termsAndPrivacyPolicy.cancellationAndRefundDescription2"),
              t("termsAndPrivacyPolicy.cancellationAndRefundDescription3")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.monthlySubscription")}
            detailsList={[
              t("termsAndPrivacyPolicy.monthlySubscriptionDescription1"),
              t("termsAndPrivacyPolicy.monthlySubscriptionDescription2"),
              t("termsAndPrivacyPolicy.monthlySubscriptionDescription3"),
              t("termsAndPrivacyPolicy.monthlySubscriptionDescription4")
            ]}
          />
          <br />
          <TermsPrivacyRow type={'list'}
            title={t("termsAndPrivacyPolicy.availablePackages")}
            detailsList={[
              t("termsAndPrivacyPolicy.availablePackagesDescription1"),
              t("termsAndPrivacyPolicy.availablePackagesDescription2"),
              t("termsAndPrivacyPolicy.availablePackagesDescription3")
            ]}
            nestedList={{
                index: 0,
                list: [
                    t("termsAndPrivacyPolicy.availablePackagesDescription11"),
                    t("termsAndPrivacyPolicy.availablePackagesDescription12"),
                    t("termsAndPrivacyPolicy.availablePackagesDescription13")      
                ]
            }}
          />
          <br /> <br />
          <TermsPrivacyRow
            title={t("termsAndPrivacyPolicy.responsibilityAndGuarantees")}
            details={t("termsAndPrivacyPolicy.responsibilityAndGuaranteesDescription")}
          />
          <br /> <br />
          <TermsPrivacyRow
            title={t("termsAndPrivacyPolicy.modificationsAndUpdates")}
            details={t("termsAndPrivacyPolicy.modificationsAndUpdatesDescription")}
          />
          <br /> <br />
          <TermsPrivacyRow
            title={t("termsAndPrivacyPolicy.contactUs")}
            details={t("termsAndPrivacyPolicy.contactUsDescription")}
          />
        </div>        
    </>
  )
}

export default withTranslation()(TermsPrivacyModalChildren)