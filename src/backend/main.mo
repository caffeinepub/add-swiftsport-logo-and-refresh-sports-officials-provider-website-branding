import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  public type LeadCaptureRequest = {
    name : Text;
    phone : Text;
    jobSeeker : Bool;
    foundingInterest : Bool;
    investor : Bool;
    internInterest : Bool;
  };

  type Entry = {
    submitted : Bool;
    data : LeadCaptureRequest;
  };

  let requests = Map.empty<Text, Entry>();

  public query ({ caller }) func isSubmitted(email : Text) : async Bool {
    switch (requests.get(email)) {
      case (?request) { request.submitted };
      case (null) { Runtime.trap("Request not found") };
    };
  };

  public shared ({ caller }) func createLeadCaptureRequest(email : Text, name : Text, phone : Text, jobSeeker : Bool, foundingInterest : Bool, investor : Bool, internInterest : Bool) : async () {
    let entry = {
      submitted = true;
      data = { name; phone; jobSeeker; foundingInterest; investor; internInterest };
    };
    requests.add(email, entry);
  };

  public query ({ caller }) func getAllRequests() : async [(Text, Entry)] {
    requests.toArray();
  };
};
