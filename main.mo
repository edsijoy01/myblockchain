import Array "mo:base/Array";
actor {
  stable var students : [Student] = [];
  public type Student = {fname : Text;lname : Text;mail : Text;};
  public query func getStudents() : async [Student] {
    return students;
  };
  public func addStudent(fname : Text, lname : Text, mail : Text) : async () {
    let newStudent : Student = { fname; lname; mail };
    students := Array.append <Student>(students, [newStudent]);
  };
};