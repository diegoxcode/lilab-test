import moment from "moment-timezone";

export const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "Pendiente";

    const timeZone = "America/Lima"; // Cambia esto a tu zona horaria local
    const formattedDate = moment.tz(dateString, timeZone).format("DD/MM/YYYY HH:mm:ss");

    return formattedDate;
};