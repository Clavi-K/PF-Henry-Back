module.exports = {
    atlas: {
        SCHEMA: process.env.ATLASSCHEMA,
        USER: process.env.ATLASUSER,
        PASSWORD: process.env.ATLASPASSWORD,
        DATABASE: process.env.ATLASDATABASE,
        OPTIONS: process.env.ATLASOPTIONS,
        HOSTNAME: process.env.ATLASHOSTNAME
    },
    moviesApi: {
        MOVIESPOPULARURL: process.env.MOVIESPOPULARURL,
        SEARCHURL: process.env.MOVIESSEARCHURL,
        GETMOVIE: process.env.GETMOVIE,
        GENRESURL: process.env.GENRESURL,
        GETUPCOMINGURL: process.env.GETUPCOMINGURL
    },
    notifications: {
        GMAIL: process.env.GMAILADDRESS,
        PWD: process.env.GMAILAPPPWD
    },
    gooelAuth: {
        type: process.env.TYPE,
        project_id: process.env.PROJECTID,
        private_key_id: process.env.PRIVATEKEYID,
        private_key: process.env.PRIVATEKEY,
        client_email: process.env.CLIENTEMAIL,
        client_id: process.env.CLIENTID,
        auth_uri: process.env.AUTHURI,
        token_uri: process.env.TOKENURI,
        auth_provider_x509_cert_url: process.env.AUTHX509,
        client_x509_cert_url: process.env.CLIENTX509
    }
}