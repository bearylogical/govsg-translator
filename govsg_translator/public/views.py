# -*- coding: utf-8 -*-
"""Public section, including homepage and signup."""
from flask import (
    Blueprint,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
from flask_login import login_required, login_user, logout_user

from govsg_translator.extensions import login_manager
from govsg_translator.public.forms import PhoneForm
from govsg_translator.user.forms import RegisterForm
from govsg_translator.user.models import Phone, User
from govsg_translator.utils import flash_errors

blueprint = Blueprint("public", __name__, static_folder="../static")


@login_manager.user_loader
def load_user(user_id):
    """Load user by ID."""
    return User.get_by_id(int(user_id))


@blueprint.route("/", methods=["GET", "POST"])
def home():
    """Home page."""
    form = PhoneForm()
    current_app.logger.info("Hello from the home page!")
    # phone number
    # TODO: write phone number logic / form handler here

    return render_template("public/home.html", form=form)


@blueprint.route("/register/<lang>", methods=["POST"])
def show_phone(lang):
    form = PhoneForm(request.form)
    if request.method == "POST":
        if form.validate_on_submit():
            current_app.logger.info(f"{form.phone.data}")
            session["phone"] = form.phone.data
            Phone.create(phone_number=form.phone.data, language=lang)
            status = 'success'
            return status
        else:
            return "error"
    # return render_template("public/home.html", form=form)


@blueprint.route("/logout/")
@login_required
def logout():
    """Logout."""
    logout_user()
    flash("You are logged out.", "info")
    return redirect(url_for("public.home"))


# @blueprint.route("/register/", methods=["GET", "POST"])
# def register():
#     """Register new user."""
#     form = RegisterForm(request.form)
#     if form.validate_on_submit():
#         User.create(
#             username=form.username.data,
#             email=form.email.data,
#             password=form.password.data,
#             active=True,
#         )
#         flash("Thank you for registering. You can now log in.", "success")
#         return redirect(url_for("public.home"))
#     else:
#         flash_errors(form)
#     return render_template("public/register.html", form=form)


@blueprint.route("/about/")
def about():
    """About page."""
    return render_template("public/about.html")
