import {Fragment} from 'react';
import classes from './Header.module.css'
import budgetImage from '../../assets/familybudget.jpeg';

const Header = () => {
    return <Fragment>
        <header className={classes.header}>
            <h1>FamilyBudget</h1>
        </header>
        <div className={classes['main-image']}>
            <img src={budgetImage} alt="Gold bars"/>
        </div>
    </Fragment>
}

export default Header;