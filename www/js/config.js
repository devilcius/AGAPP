angular.module('augc-app').constant(
        'AUGC_CONFIG', {
            apiResponseFormat: '.json',
            apiPostsUrl: 'http://augc.org/api/news/posts/',
            apiDelegacionsUrl: 'http://augc.org/api/admin/delegacions/',
            loginUrl: 'https://augc.org/app/user/login_check',
            shareComunicadoMsg: "Echa un vistazo a este comunicado",
            shareComunicadoSubject: "Alguien ha compartido un comunicado de AUGC contigo" //to be improved with user name
});