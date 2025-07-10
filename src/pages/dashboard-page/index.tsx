import useAuthCtx from "@contexts/auth/use-auth";


const UserCard = () => {
    const {user} = useAuthCtx();
  const formatDate = (dateStr: string | null) =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 space-y-3">
      <h2 className="text-2xl font-semibold text-gray-800">
        {user.full_name}
      </h2>

      <div className="space-y-1 text-sm text-gray-600">
        <p><strong>Email:</strong> {user.email_address}</p>
        <p><strong>Verified:</strong> {user.is_verified ? "✅ Yes" : "❌ No"}</p>
        <p><strong>Verified At:</strong> {formatDate(user.verified_at)}</p>
        <p><strong>Created At:</strong> {formatDate(user.created_at)}</p>
        <p><strong>Updated At:</strong> {formatDate(user.updated_at)}</p>
        <p><strong>Mobile:</strong> {user.mobile_number ?? "N/A"}</p>
        <p><strong>Country Code:</strong> {user.country_code ?? "N/A"}</p>
        <p className="text-xs text-gray-400">User ID: {user.id}</p>
      </div>
    </div>
  );
};

export default UserCard;
