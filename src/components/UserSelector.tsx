import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  usersLoaded: User[];
  selectedUser: User | null;
  onClickSelect: (value: User | null) => void;
  loadUserPost: (value: number) => Promise<void>;
};

export const UserSelector: React.FC<Props> = ({
  usersLoaded,
  selectedUser,
  onClickSelect,
  loadUserPost,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleClickSelect = (user: User) => {
    loadUserPost(user.id);
    onClickSelect(user);
    setIsDropDownOpen(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownOpen(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropDownOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {usersLoaded.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onClick={() => handleClickSelect(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
