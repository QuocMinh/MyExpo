module.exports = {
    SERVICE_HOST: "http://10.32.10.11", // "http://10.151.124.85"
    SERVICE_PORT: "9180", // "8080"

    PATH_NEW_CUSTOMER: "/api/Booking/New",
    PATH_GET_HELPDESK: "/api/HelpDesk/Load",
    PATH_GET_CUSTOMER_BY_HELPDESDK: "/api/Booking/LoadBookedByHelpdesk?helpdesk=",
    PATH_GET_HELPDESK_AND_CUSTOMER: "/api/HelpDesk/PrepareHelpDesk", 
    PATH_UPDATE_HELPDESK_STATUS: "/api/Booking/UpdateBookedStatus"
}


// module.exports = {
//     SERVICE_HOST    : "http://10.151.124.85",
//     SERVICE_PORT    : "8080",

//     PATH_NEW_CUSTOMER: "/api/book/new", // ok
//     PATH_GET_HELPDESK: "/api/book/load/helpdesk", // ok
//     PATH_GET_CUSTOMER_BY_HELPDESDK: "/api/book/load/customer/", // ok
//     PATH_GET_HELPDESK_AND_CUSTOMER: "/api/book/load", 
//     PATH_UPDATE_HELPDESK_STATUS: "/api/book/update/status"
// }