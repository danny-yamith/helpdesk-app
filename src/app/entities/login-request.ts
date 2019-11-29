export default class LoginRequest {
    public login : string
    public pass : string
    public type : string = "web"
    public extras? : string
    public phone? : string
    public pack? : string
    public returnToken? : boolean
    public poolName : string
    public tz : string
}