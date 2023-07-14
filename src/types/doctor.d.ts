export interface DoctorType{
    avatar:string
    initials:string
    acceptVirtualVisitOnly:boolean
    description:string
    name:string
    title:string
    availability:Array<{date:string, time:string}>
}