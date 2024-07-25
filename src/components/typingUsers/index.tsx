type TypingUsersProps = {
  users: { userId: string; message: string }[];
};

const TypingUsers = ({ users }: TypingUsersProps) => {
  return (
    <div className="text-center text-xs w-full text-black absolute bottom-20 tracking-widest">
      {users.map((typingUser, index: number) => {
        return <p key={index}>{typingUser.message}</p>;
      })}
    </div>
  );
};

export default TypingUsers;
