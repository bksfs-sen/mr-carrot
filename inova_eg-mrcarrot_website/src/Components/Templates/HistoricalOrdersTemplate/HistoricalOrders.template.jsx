import EmptyState from "../../Organisms/EmptyState.jsx/EmptyState";
import HistoricalOrderCard from "../../Molecules/HistoricalOrderCard/HistoricalOrderCard";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";
import React from "react";
import { withTranslation } from "react-i18next";

const HistoricalOrdersTemplate = ({
  t,
  historicalOrders,
  isLoading,
  Reorder,
}) => {
  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingSpinner spinnerStyle="h-full items-center" />
      ) : historicalOrders?.length > 0 ? (
        historicalOrders?.map((order, i) => (
          <HistoricalOrderCard t={t} key={i} order={order} Reorder={Reorder} />
        ))
      ) : (
        <EmptyState
          path="/"
          title={t("emptyState.historicalOrders.title")}
          message={t("emptyState.historicalOrders.description")}
          buttonName={t("emptyState.historicalOrders.button")}
        />
      )}
    </div>
  );
};

export default withTranslation()(HistoricalOrdersTemplate);
