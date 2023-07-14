export interface DoctorType{
    id:number
    avatar:string
    acceptVirtualVisitOnly:boolean
    bio:string
    name:string
    title:string
    availableSlots:Array<{date:string, time:string}>
}