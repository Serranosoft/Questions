import * as Notifications from "expo-notifications";

// Función para programar una notificación que se lance en los siguientes 10 segundos
export async function testNotification() {
    try {
        // Obtener la lista de notificaciones programadas
        const notificacionesProgramadas = await Notifications.getAllScheduledNotificationsAsync();

        const existeNotificacionProgramada = notificacionesProgramadas.some((notificacion) => {
            return notificacion.identifier === 'notificacion-5-sec';
        });

        // Si ya hay una notificación programada, no hagas nada
        if (existeNotificacionProgramada) {
            console.log('Ya hay una notificación programada para los proximos 10 segundos');
            return;
        }

        const notificacion = {
            identifier: "notificacion-5-sec",
            content: {
                title: '¡Hoy es sábado!',
                body: '¡Disfruta del juego de preguntas picantes mas divertido con tus amigos o tu pareja!',
            },
            trigger: {
                seconds: 5, // La hora a la que se lanzará la notificación
            },
        };

        // Programa la notificación
        await Notifications.scheduleNotificationAsync(notificacion);

        console.log('Notificación programada para dentro de 5 segundos.');
    } catch (error) {
        console.error('Error al programar la notificación:', error);
    }
};

export async function scheduleWeeklyNotification() {
    try {

        // Obtener la lista de notificaciones programadas
        const notificacionesProgramadas = await Notifications.getAllScheduledNotificationsAsync();

        const existeNotificacionProgramada = notificacionesProgramadas.some((notificacion) => {
            return notificacion.identifier === 'notificacion-semanal';
        });

        // Si ya hay una notificación programada, no hagas nada
        if (existeNotificacionProgramada) {
            console.log('Ya hay una notificación programada para la próxima semana.');
            return;
        }

        const notificacion = {
            identifier: 'notificacion-semanal',
            content: {
                title: '¡Hoy es sábado!',
                body: '¡Disfruta del juego de preguntas picantes mas divertido con tus amigos o tu pareja!',
            },
            trigger: {
                seconds: getLeftTimeToNextSaturday(),
                repeats: 'week',
            },
        };

        // Programa la notificación
        await Notifications.scheduleNotificationAsync(notificacion);

        console.log('Notificación programada para el próximo sábado a las 19:00');
    } catch (error) {
        console.error('Error al programar la notificación:', error);
    }
};

export function getLeftTimeToNextSaturday() {
    const hoy = new Date();
    const diaDeLaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Calcula cuántos días faltan hasta el próximo sábado
    const diasHastaSabado = 6 - diaDeLaSemana;

    // Crea una nueva fecha para el próximo sábado
    const proximoSabado = new Date(hoy);
    proximoSabado.setDate(hoy.getDate() + diasHastaSabado);

    // Establece la hora a las 21:00:00 para el próximo sábado
    proximoSabado.setHours(21, 0, 0, 0);

    if (hoy > proximoSabado) {
        proximoSabado.setDate(proximoSabado.getDate() + 7); // Añade 7 días para el próximo sábado
    }

    // Calcula la diferencia en segundos entre la fecha actual y el próximo sábado a las 21:00
    const diferenciaEnSegundos = Math.floor((proximoSabado - hoy) / 1000);

    return diferenciaEnSegundos;
}


export async function getNotificationInfo() {
    const info = await Notifications.getAllScheduledNotificationsAsync();
}

export async function removeAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}