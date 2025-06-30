
enum TAction {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    VIEW = 'VIEW',
    OTHER = 'OTHER',
}

export interface TAudit {
    action:TAction,
    resource:string,
    resource_id?:string,
    details?:string,
    user_id:string,
}