import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type RefereeBookingRequest = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let requests = List.empty<RefereeBookingRequest>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitBookingRequest(email : Text, name : Text, phone : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit booking requests");
    };
    let newRequest = {
      name;
      phone;
      email;
      message;
    };
    requests.add(newRequest);
  };

  public shared ({ caller }) func submitQuickRequest(name : Text, phone : Text, email : Text, message : Text) : async () {
    let newRequest = {
      name;
      phone;
      email;
      message;
    };
    requests.add(newRequest);
  };

  public query ({ caller }) func getAllRequests() : async [RefereeBookingRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all booking requests");
    };
    requests.toArray();
  };
};
