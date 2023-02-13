import { Link } from 'react-router-dom';
import UserBadge from '../UserBadge';
import './styles.css';

const Navbar = ({
    nickName,
    avatarUrl,
    id,
}) => {
    return (
        <div className="cnNavbarRoot">
            <div className='cnNavbarWrapper'>
                <Link to='/' className='cnNavbarLink'><b>Fakesta</b></Link>
                <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id} />
            </div>
        </div>
    );
};

export default Navbar;