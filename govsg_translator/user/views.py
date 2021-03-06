# -*- coding: utf-8 -*-
"""User views."""
from flask import Blueprint, render_template
from flask_login import login_required

blueprint = Blueprint("user", __name__, url_prefix="/users", static_folder="../static")

# TODO : functionality for admin page
# TODO : function to send message to users
@blueprint.route("/")
@login_required
def members():
    """List members."""
    return render_template("users/members.html")
