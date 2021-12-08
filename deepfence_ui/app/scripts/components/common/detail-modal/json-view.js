import React from "react";
import ReactJson from "react-json-view";

function newJSONobject(responseData) {
  const jsonData = responseData;
  const correlated_alerts = [];
  if (jsonData.correlated_alerts !== undefined) {
    jsonData.correlated_alerts.forEach((element) => {
      correlated_alerts.push(
        `${window.location.hostname
        }${element.props.children.props.children.props.to}`
      );
    });
    jsonData.correlated_alerts = correlated_alerts;
  } else {
    return responseData;
  }
  return jsonData;
}

export const JSONView = ({ data }) => (
  <div style={{ whiteSpace: 'pre-wrap' }}>
    <ReactJson
      src={newJSONobject(data)}
      displayDataTypes={false}
      displayObjectSize={false}
      displayArrayKey={false}
      indentWidth={3}
      collapseStringsAfterLength={100}
      theme="colors"
      style={{ backgroundColor: '#141414' }}
    />
  </div>
);
