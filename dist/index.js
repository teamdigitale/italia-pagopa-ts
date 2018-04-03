"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const soap = require("soap");
// import interface for "PSP" services
const FespPspService = require("./wsdl-lib/FespPspService/PSPPort");
exports.FespPspService = FespPspService;
const AvvisiDigitaliService = require("./wsdl-lib/AvvisiDigitaliService/PPTPort");
exports.AvvisiDigitaliService = AvvisiDigitaliService;
// import interfaces for "pagoPA" services (Nodo and Avvisatura)
const PagamentiTelematiciPspNodoService = require("./wsdl-lib/PagamentiTelematiciPspNodoservice/PPTPort");
exports.PagamentiTelematiciPspNodoService = PagamentiTelematiciPspNodoService;
const IscrizioniAvvisaturaService = require("./wsdl-lib/IscrizioniAvvisaturaService/PPTPort");
exports.IscrizioniAvvisaturaService = IscrizioniAvvisaturaService;
const NodoChiediElencoAvvisiDigitaliService = require("./wsdl-lib/NodoChiediElencoAvvisiDigitaliService/PPTPort");
exports.NodoChiediElencoAvvisiDigitaliService = NodoChiediElencoAvvisiDigitaliService;
// path to WSDL(s) of "PSP" service
const FespPspService_WSDL_PATH = "wsdl/nodo/NodoPerPsp.wsdl";
const AvvisiDigitaliService_WSDL_PATH = "wsdl/avvisatura/PSPPerNodoAvvisiDigitali.wsdl";
// path to WSDL(s) of "pagoPA" services (Nodo and Avvisatura)
const PagamentiTelematiciPspNodoService_WSDL_PATH = "wsdl/nodo/PspPerNodo.wsdl";
const IscrizioniAvvisaturaService_WSDL_PATH = "wsdl/avvisatura/NodoPerPSPIscrizioniAvvisatura.wsdl";
const NodoChiediElencoAvvisiDigitaliService_WSDL_PATH = "wsdl/avvisatura/NodoPerPSPChiediElencoAvvisiDigitali.wsdl";
/**
 * Helper method that wraps the creation of a WSDL client within a Promise and
 * adds the typed interfaces generated by wsdl-to-ts.
 */
function createClient(wsdlUri, options) {
    return new Promise((resolve, reject) => {
        soap.createClient(wsdlUri, options, (err, client) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(client);
            }
        });
    });
}
/**
 * Converts a SoapMethodCB into a SoapMethodPromise
 */
function promisifySoapMethod(f) {
    return (input) => new Promise((resolve, reject) => {
        f(input, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}
/**
 * Creates a client for the "PagamentiTelematiciPspNodo" service
 */
function createPagamentiTelematiciPspNodoClient(options) {
    return createClient(PagamentiTelematiciPspNodoService_WSDL_PATH, options);
}
exports.createPagamentiTelematiciPspNodoClient = createPagamentiTelematiciPspNodoClient;
/**
 * Creates a client for the "IscrizioniAvvisatura" service
 */
function createIscrizioniAvvisaturaClient(options) {
    return createClient(IscrizioniAvvisaturaService_WSDL_PATH, options);
}
exports.createIscrizioniAvvisaturaClient = createIscrizioniAvvisaturaClient;
/**
 * Creates a client for the "NodoChiediElencoAvvisiDigitali" service
 */
function createNodoChiediElencoAvvisiDigitaliClient(options) {
    return createClient(NodoChiediElencoAvvisiDigitaliService_WSDL_PATH, options);
}
exports.createNodoChiediElencoAvvisiDigitaliClient = createNodoChiediElencoAvvisiDigitaliClient;
/**
 * Converts the callback based methods of a PagamentiTelematiciPspNodo client to
 * promise based methods.
 */
class PagamentiTelematiciPspNodoAsyncClient {
    constructor(client) {
        this.client = client;
        this.nodoVerificaRPT = promisifySoapMethod(this.client.nodoVerificaRPT);
        this.nodoAttivaRPT = promisifySoapMethod(this.client.nodoAttivaRPT);
        this.nodoInviaRT = promisifySoapMethod(this.client.nodoInviaRT);
        this.nodoChiediInformativaPA = promisifySoapMethod(this.client.nodoChiediInformativaPA);
        this.nodoChiediTemplateInformativaPSP = promisifySoapMethod(this.client.nodoChiediTemplateInformativaPSP);
        this.nodoInviaFlussoRendicontazione = promisifySoapMethod(this.client.nodoInviaFlussoRendicontazione);
        this.nodoChiediElencoQuadraturePSP = promisifySoapMethod(this.client.nodoChiediElencoQuadraturePSP);
        this.nodoChiediQuadraturaPSP = promisifySoapMethod(this.client.nodoChiediQuadraturaPSP);
        this.nodoInviaEsitoStorno = promisifySoapMethod(this.client.nodoInviaEsitoStorno);
        this.nodoInviaRichiestaRevoca = promisifySoapMethod(this.client.nodoInviaRichiestaRevoca);
    }
}
exports.PagamentiTelematiciPspNodoAsyncClient = PagamentiTelematiciPspNodoAsyncClient;
/**
 * Converts the callback based methods of a IscrizioniAvvisatura client to
 * promise based methods.
 */
class IscrizioniAvvisaturaAsyncClient {
    constructor(client) {
        this.client = client;
        this.nodoAggiornaIscrizioniAvvisatura = promisifySoapMethod(this.client.nodoAggiornaIscrizioniAvvisatura);
    }
}
exports.IscrizioniAvvisaturaAsyncClient = IscrizioniAvvisaturaAsyncClient;
/**
 * Converts the callback based methods of a NodoChiediElencoAvvisiDigitali
 * client to promise based methods.
 */
class NodoChiediElencoAvvisiDigitaliAsyncClient {
    constructor(client) {
        this.client = client;
        this.nodoChiediElencoAvvisiDigitali = promisifySoapMethod(this.client.nodoChiediElencoAvvisiDigitali);
    }
}
exports.NodoChiediElencoAvvisiDigitaliAsyncClient = NodoChiediElencoAvvisiDigitaliAsyncClient;
function readWsdl(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding: "UTF-8" }, (err, wsdl) => {
                if (err) {
                    return reject(err);
                }
                resolve(wsdl);
            });
        });
    });
}
/**
 * Creates a server for the FespPsp service.
 *
 * This function mostly wraps the `soap.listen(...)` method.
 * @see https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl---create-a-new-soap-server-that-listens-on-path-and-provides-services
 *
 * @param server    See soap.listen documentation
 * @param path      See soap.listen documentation
 * @param fespPspHandlers  An object that implements the IPSPPortSoap interface
 */
function attachFespPspServer(server, path, fespPspHandlers) {
    return __awaiter(this, void 0, void 0, function* () {
        const wsdl = yield readWsdl(FespPspService_WSDL_PATH);
        const service = {
            FespPspService: {
                PSPPort: fespPspHandlers,
            },
        };
        return (soap.listen(server, path, service, wsdl));
    });
}
exports.attachFespPspServer = attachFespPspServer;
/**
 * Creates a server for the AvvisiDigitali service.
 *
 * This function mostly wraps the `soap.listen(...)` method.
 * @see https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl---create-a-new-soap-server-that-listens-on-path-and-provides-services
 *
 * @param server    See soap.listen documentation
 * @param path      See soap.listen documentation
 * @param fespPspHandlers  An object that implements the IPSPPortSoap interface
 */
function attachAvvisiDigitaliServer(server, path, avvisiDigitaliHandlers) {
    return __awaiter(this, void 0, void 0, function* () {
        const wsdl = yield readWsdl(FespPspService_WSDL_PATH);
        const service = {
            AvvisiDigitaliService: {
                PPTPort: avvisiDigitaliHandlers,
            }
        };
        return (soap.listen(server, path, service, wsdl));
    });
}
exports.attachAvvisiDigitaliServer = attachAvvisiDigitaliServer;
//# sourceMappingURL=index.js.map