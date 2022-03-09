import { zipObject } from 'lodash';

const ACTION_TYPES = [
  'ADD_QUERY_FILTER',
  'CHANGE_INSTANCE',
  'RECEIVE_API_DETAILS',
  'RECEIVE_ERROR',
  'RECEIVE_NODE_DETAILS',
  'RECEIVE_NODES_DELTA',
  'RECEIVE_NOT_FOUND',
  'RECEIVE_TOPOLOGIES',
  'REQUEST_SERVICE_IMAGES',
  'SET_EXPORTING_GRAPH',
  'SET_VIEW_MODE',
  // New action types---> Actions for GUI's other components.
  'EXPAND_SIDE_NAVIGATION',
  'COLLAPSE_SIDE_NAVIGATION',
  'RECEIVE_ALERT_STATS',
  'RECEIVE_VULNERABILITY_STATS',
  'RECEIVE_AREA_CHART_DATA',
  'SELECT_ALERT_HISTORY_BOUND',
  'SELECT_REFRESH_INTERVAL',
  'SET_SEARCH_QUERY',
  'SET_SEARCH_BAR_VALUE',
  'RECEIVE_SEVERITY_DONUT_DETAILS',
  'RECEIVE_ANOMALY_DONUT_DETAILS',
  'RECEIVE_RESOURCE_DONUT_DETAILS',
  'RESET_DONUT_STORE_STAETS',
  'OPEN_DONUT_DETAILS_MODAL',
  'CLOSE_DONUT_DETAILS_MODAL',
  'SAVE_PREV_FILE_LIST',
  'RECEIVE_NODE_SPECIFIC_DETAILS',
  // TABLE JSON VIEW MODAL
  'OPEN_TABLE_JSON_MODAL',
  'CLOSE_TABLE_JSON_MODAL',
  'UPDATE_TABLE_JSON_MODAL_VIEW',
  'SET_ACTIVE_SECTOR',
  'SET_ACTIVE_FILTERS',
  // ALERT MASK ACTIONS
  'FOCUS_MASKED_ALERT_ROW',
  'UN_FOCUS_MASKED_ALERT_ROW',
  // THREAT METRIC
  'RECEIVE_THREAT_METRIC_DETAILS',
  // GEO MAP
  'GET_GEO_MAP_DATA',
  'RECEIVE_GEO_MAP_DATA',
  // FILTERS VIEW
  'TOGGLE_FILTER_VIEW',
  // GET CONTAINERS COUNT
  'GET_CONTAINER_COUNT',
  // GET HOSTS COUNT
  'GET_TOPOLOGY_METRICS',
  'GET_HOST_COUNT',
  // AUTH MODULE
  'RECEIVE_USER_PROFILE',
  'RECEIVE_ALERTS',
  'LOGIN_SUCCESS',
  'LOGIN_FAILED',
  'RECEIVE_REGISTRATION_RESPONSE',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAILED',
  'PASSWORD_RESET_LINK_RESPONSE',
  'RECEIVE_PASSWORD_CHANGE_RESPONSE',
  'RECEIVE_SIGN_UP_INVITE_RESPONSE',
  'RECEIVE_SIGN_UP_VIA_INVITE_RESPONSE',
  'RECEIVE_EULA_RESPONSE',
  'TOGGLE_NAVBAR_STATE',
  'RECEIVE_ALERT_DELETE_RESPONSE',
  'RECEIVE_INTEGRATION_ADD_RESPONSE',
  'RECEIVE_INTEGRATION_RESPONSE',
  'RESET_INTEGRATION_STATES',
  'RESET_USER_MANAGEMENT_STATES',
  'ENABLE_NOTIFICATION_ICON',
  'DISABLE_NOTIFICATION_ICON',
  'TOASTER_NOTIFICATION_SHOW',
  'TOASTER_NOTIFICATION_HIDE',
  'RECEIVE_CVE_SEVERITY_CHART_DATA',
  'RECEIVE_SYSTEM_STATUS',
  'RECEIVE_AUTH_MODULE_STATES',
  'RECEIVE_CLEAR_DASHBOARD_RESPONSE',
  'SHOW_MODAL',
  'HIDE_MODAL',
  'RESET_API_KEY_REQUEST',
  'RESET_API_KEY_SUCCESS',
  'RESET_API_KEY_FAILURE',
  'CVE_SCAN_STATUS_SUCCESS',
  'CVE_SCAN_STATUS_FAILURE',
  'CVE_SCAN_STATUS_REQUEST',
  'CVE_SCAN_INTERIM_STATUS_UPDATE',
  'CVE_FOR_HOST_REQUEST',
  'CVE_FOR_HOST_SUCCESS',
  'CVE_FOR_HOST_FAILURE',
  'UPDATE_TABLE_JSON_MODAL_META',
  'UPDATE_TABLE_JSON_MODAL_META_FAILURE',
  'SET_ROW_SELECTION',
  'RESET_SELECTION',
  'CVE_SEVERITY_REPORT_REQUEST',
  'CVE_SEVERITY_REPORT_SUCCESS',
  'CVE_SEVERITY_REPORT_FAILURE',
  'CVE_IMAGE_REPORT_REQUEST',
  'CVE_IMAGE_REPORT_SUCCESS',
  'CVE_IMAGE_REPORT_FAILURE',
  'CVE_TYPE_REPORT_REQUEST',
  'CVE_TYPE_REPORT_SUCCESS',
  'CVE_TYPE_REPORT_FAILURE',
  'UNMASK_DOCS_REQUEST',
  'UNMASK_DOCS_SUCCESS',
  'UNMASK_DOCS_FAILURE',
  'DELETE_DOCS_BY_ID_REQUEST',
  'DELETE_DOCS_BY_ID_SUCCESS',
  'DELETE_DOCS_BY_ID_FAILURE',
  'GET_ALL_USERS_REQUEST',
  'GET_ALL_USERS_SUCCESS',
  'GET_ALL_USERS_FAILURE',
  'DELETE_USER_REQUEST',
  'DELETE_USER_SUCCESS',
  'DELETE_USER_FAILURE',
  'MASK_DOCS_REQUEST',
  'MASK_DOCS_SUCCESS',
  'MASK_DOCS_FAILURE',
  'TOP_AFFECTED_NODES_REQUEST',
  'TOP_AFFECTED_NODES_SUCCESS',
  'TOP_AFFECTED_NODES_FAILURE',
  'TOP_AFFECTED_NODES_CHART_REQUEST',
  'TOP_AFFECTED_NODES_CHART_SUCCESS',
  'TOP_AFFECTED_NODES_CHART_FAILURE',
  'GET_ALL_KUBERNETES_PODS_REQUEST',
  'GET_ALL_KUBERNETES_PODS_SUCCESS',
  'GET_ALL_KUBERNETES_PODS_FAILURE',
  'GET_KUBERNETES_CNI_PLUGIN_REQUEST',
  'GET_KUBERNETES_CNI_PLUGIN_SUCCESS',
  'GET_KUBERNETES_CNI_PLUGIN_FAILURE',
  'GET_TOPOLOGY_CVE_STATUS_REQUEST',
  'GET_TOPOLOGY_CVE_STATUS_SUCCESS',
  'GET_TOPOLOGY_CVE_STATUS_FAILURE',
  'GET_DIAGNOSTIC_LOGS_REQUEST',
  'GET_DIAGNOSTIC_LOGS_SUCCESS',
  'GET_DIAGNOSTIC_LOGS_FAILURE',
  'RESET_DIAGNOSTIC_LOGS_DOWNLOAD_STATE',
  'START_CVE_BULK_REQUEST',
  'START_CVE_BULK_SUCCESS',
  'START_CVE_BULK_FAILURE',
  'ADD_USER_DEFINED_TAGS_REQUEST',
  'ADD_USER_DEFINED_TAGS_SUCCESS',
  'ADD_USER_DEFINED_TAGS_FAILURE',
  'DELETE_USER_DEFINED_TAGS_REQUEST',
  'DELETE_USER_DEFINED_TAGS_SUCCESS',
  'DELETE_USER_DEFINED_TAGS_FAILURE',
  'CLEAR_USER_DEFINED_TAGS',
  'GET_RUNNING_NOTIFICATION_REQUEST',
  'GET_RUNNING_NOTIFICATION_SUCCESS',
  'GET_RUNNING_NOTIFICATION_FAILURE',
  'START_CVE_SCAN_REQUEST',
  'START_CVE_SCAN_SUCCESS',
  'START_CVE_SCAN_FAILURE',
  'STOP_CVE_SCAN_REQUEST',
  'STOP_CVE_SCAN_SUCCESS',
  'STOP_CVE_SCAN_FAILURE',
  'GET_NODE_TAGS_REQUEST',
  'GET_NODE_TAGS_SUCCESS',
  'GET_NODE_TAGS_FALIURE',
  'VULNERABILITY_CSV_DOWNLOAD_REQUEST',
  'VULNERABILITY_CSV_DOWNLOAD_SUCCESS',
  'VULNERABILITY_CSV_DOWNLOAD_FAILURE',
  'LIST_REGISTRY_IMAGES_REQUEST',
  'LIST_REGISTRY_IMAGES_SUCCESS',
  'LIST_REGISTRY_IMAGES_FAILURE',
  'SCAN_REGISTRY_IMAGES_REQUEST',
  'SCAN_REGISTRY_IMAGES_SUCCESS',
  'SCAN_REGISTRY_IMAGES_FAILURE',
  'SECRETS_SCAN_REGISTRY_IMAGES_REQUEST',
  'SECRETS_SCAN_REGISTRY_IMAGES_SUCCESS',
  'SECRETS_SCAN_REGISTRY_IMAGES_FAILURE',
  'SAVE_CONTAINER_IMAGE_REGISTRY_REQUEST',
  'SAVE_CONTAINER_IMAGE_REGISTRY_SUCCESS',
  'SAVE_CONTAINER_IMAGE_REGISTRY_FAILURE',
  'CLEAR_CONTAINER_IMAGE_REGISTRY_ADD_FORM',
  'LIST_CONTAINER_IMAGE_REGISTRY_REQUEST',
  'LIST_CONTAINER_IMAGE_REGISTRY_SUCCESS',
  'LIST_CONTAINER_IMAGE_REGISTRY_FAILURE',
  'DELETE_CONTAINER_IMAGE_REGISTRY_REQUEST',
  'DELETE_CONTAINER_IMAGE_REGISTRY_SUCCESS',
  'DELETE_CONTAINER_IMAGE_REGISTRY_FAILURE',
  'CLEAR_SCAN_REGISTRY_IMAGES',
  'GET_TOP_VULNERABLE_CONTAINERS_REQUEST',
  'GET_TOP_VULNERABLE_CONTAINERS_SUCCESS',
  'GET_TOP_VULNERABLE_CONTAINERS_FAILURE',
  'GET_TOP_VULNERABLE_HOSTS_REQUEST',
  'GET_TOP_VULNERABLE_HOSTS_SUCCESS',
  'GET_TOP_VULNERABLE_HOSTS_FAILURE',
  'SAVE_IMAGE_REPORT_TABLE_STATE',
  'GET_CVE_SEVERITY_PER_NODE_REQUEST',
  'GET_CVE_SEVERITY_PER_NODE_SUCCESS',
  'GET_CVE_SEVERITY_PER_NODE_FAILURE',
  'GET_TOP_ATTACK_PATHS_PER_NODE_REQUEST',
  'GET_TOP_ATTACK_PATHS_PER_NODE_SUCCESS',
  'GET_TOP_ATTACK_PATHS_PER_NODE_FAILURE',
  'GET_TOP_ATTACK_PATHS_PER_DOC_REQUEST',
  'GET_TOP_ATTACK_PATHS_PER_DOC_SUCCESS',
  'GET_TOP_ATTACK_PATHS_PER_DOC_FAILURE',
  'GET_VULNERABILITIES_REQUEST',
  'GET_VULNERABILITIES_SUCCESS',
  'GET_VULNERABILITIES_FAILURE',
  'TOP_VULNERABLE_NODES_REQUEST',
  'TOP_VULNERABLE_NODES_SUCCESS',
  'TOP_VULNERABLE_NODES_FAILURE',
  'REPORT_GENERATION_REQUEST',
  'REPORT_GENERATION_SUCCESS',
  'REPORT_GENERATION_FAILURE',
  'REPORT_STATUS_REQUEST',
  'REPORT_STATUS_SUCCESS',
  'REPORT_STATUS_FAILURE',
  'DOWNLOAD_REPORT_REQUEST',
  'DOWNLOAD_REPORT_SUCCESS',
  'DOWNLOAD_REPORT_FAILURE',
  'REPORT_EMAIL_SCHEDULE_REQUEST',
  'REPORT_EMAIL_SCHEDULE_SUCCESS',
  'REPORT_EMAIL_SCHEDULE_FAILURE',
  'GET_REPORT_FILTER_OPTIONS_REQUEST',
  'GET_REPORT_FILTER_OPTIONS_SUCCESS',
  'GET_REPORT_FILTER_OPTIONS_FAILURE',
  'UPDATE_CONTAINER_REGISTRY_SEARCH',
  'CLEAR_CONTAINER_REGISTRY_SEARCH',
  'ENUMERATE_FILTERS_REQUEST',
  'ENUMERATE_FILTERS_SUCCESS',
  'ENUMERATE_FILTERS_FAILURE',
  'ENUMERATE_NODES_REQUEST',
  'ENUMERATE_NODES_SUCCESS',
  'ENUMERATE_NODES_FAILURE',
  'GET_SCHEDULED_TASKS_REQUEST',
  'GET_SCHEDULED_TASKS_SUCCESS',
  'GET_SCHEDULED_TASKS_FAILURE',
  'UPDATE_SCHEDULED_TASKS_REQUEST',
  'UPDATE_SCHEDULED_TASKS_SUCCESS',
  'UPDATE_SCHEDULED_TASKS_FAILURE',
  'GET_ALERTS_V2_REQUEST',
  'GET_ALERTS_V2_SUCCESS',
  'GET_ALERTS_V2_FAILURE',
  'TRIGGER_REGISTRY_REFRESH_REQUEST',
  'TRIGGER_REGISTRY_REFRESH_SUCCESS',
  'TRIGGER_REGISTRY_REFRESH_FAILURE',
  'SET_TABLE_COLUMN_PREFERENCE',
  'GET_TABLE_COLUMN_PREFERENCE',
  'USER_UPDATE_REQUEST',
  'USER_UPDATE_SUCCESS',
  'USER_UPDATE_FAILURE',
  'USER_UPDATE_VIEW_CLEAR',
  'DELETE_SCAN_REQUEST',
  'DELETE_SCAN_SUCCESS',
  'DELETE_SCAN_FAILURE',
  'COMPONENT_CHANGE',
  'NO_COMPONENT_CHANGE',
  'INTEGRATION_CHANGE',
  'NO_INTEGRATION_CHANGE',
  'BREADCRUMB_CHANGE',
  'SET_INTEGRATION_NAME',
  'USER_AUDIT_LOG_REQUEST',
  'USER_AUDIT_LOG_FAILURE',
  'USER_AUDIT_LOG_SUCCESS',
  'GET_ALL_MAIL_CONFIGURATIONS_REQUEST',
  'GET_ALL_MAIL_CONFIGURATIONS_SUCCESS',
  'GET_ALL_MAIL_CONFIGURATIONS_FAILURE',
  'DELETE_MAIL_CONFIGURATION_REQUEST',
  'DELETE_MAIL_CONFIGURATION_SUCCESS',
  'DELETE_MAIL_CONFIGURATION_FAILURE',
  'ADD_MAIL_CONFIGURATION_REQUEST',
  'ADD_MAIL_CONFIGURATION_SUCCESS',
  'ADD_MAIL_CONFIGURATION_FAILURE',
  'GET_GLOBAL_SETTINGS_REQUEST',
  'GET_GLOBAL_SETTINGS_SUCCESS',
  'GET_GLOBAL_SETTINGS_FAILURE',
  'ADD_GLOBAL_SETTINGS_REQUEST',
  'ADD_GLOBAL_SETTINGS_SUCCESS',
  'ADD_GLOBAL_SETTINGS_FAILURE',
  'SET_NODE_CLICK',
  'SET_TOPOLOGY_GRAPH_API',
  'ADD_TOPOLOGY_FILTER',
  'RESET_TOPOLOGY_FILTER',
  'REMOVE_TOPOLOGY_FILTER',
  'TOPOLOGY_FILTER_ADDED',
  'TOPOLOGY_FILTER_REMOVED',
  'SHOW_TOPOLOGY_PANEL',
  'SET_TOPOLOGY_PANEL_NAV_STACK',
  'GET_RUNTIME_BOM_SUCCESS',
  'GET_RUNTIME_BOM_REQUEST',
  'GET_RUNTIME_BOM_FAILURE',
  'GET_REGISTRY_IMAGES_TAGS_REQUEST',
  'GET_REGISTRY_IMAGES_TAGS_SUCCESS',
  'GET_REGISTRY_IMAGES_TAGS_FAILURE',
  'SECRET_SCAN_STATUS_REQUEST',
  'SECRET_SCAN_STATUS_SUCCESS',
  'SECRET_SCAN_STATUS_FAILURE',
  'START_SECRET_SCAN_REQUEST',
  'START_SECRET_SCAN_SUCCESS',
  'START_SECRET_SCAN_FAILURE',
  'GET_SECRET_SCAN_DATA_REQUEST',
  'GET_SECRET_SCAN_DATA_SUCCESS',
  'GET_SECRET_SCAN_DATA_FAILURE',
  'GET_SECRET_SCAN_RESULTS_REQUEST',
  'GET_SECRET_SCAN_RESULTS_SUCCESS',
  'GET_SECRET_SCAN_RESULTS_FAILURE',
  'TOP_SECRET_SCAN_NODES_REQUEST',
  'TOP_SECRET_SCAN_NODES_SUCCESS',
  'TOP_SECRET_SCAN_NODES_FAILURE',
  'TOP_SECRET_SCAN_REPORT_REQUEST',
  'TOP_SECRET_SCAN_REPORT_SUCCESS',
  'TOP_SECRET_SCAN_REPORT_FAILURE',
  'SECRET_SCAN_CHART_REQUEST',
  'SECRET_SCAN_CHART_SUCCESS',
  'SECRET_SCAN_CHART_FAILURE',
  'SBOM_BY_SCAN_ID_REQUEST',
  'SBOM_BY_SCAN_ID_SUCCESS',
  'SBOM_BY_SCAN_ID_FAILURE',
  'GET_ATTACK_PATHS_REQUEST',
  'GET_ATTACK_PATHS_SUCCESS',
  'GET_ATTACK_PATHS_FAILURE',
];

export default zipObject(ACTION_TYPES, ACTION_TYPES);
