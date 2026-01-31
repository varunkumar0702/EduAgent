from authlib.integrations.starlette_client import OAuth
import os
from dotenv import load_dotenv

load_dotenv()

oauth = OAuth()

oauth.register(
    name="linkedin",
    client_id=os.getenv("86qt0rblmci9h5"),
    client_secret=os.getenv("WPL_AP1.3KnBg5Y6iF9y3Dge.judkcQ=="),
    authorize_url="https://www.linkedin.com/oauth/v2/authorization",
    access_token_url="https://www.linkedin.com/oauth/v2/accessToken",
    client_kwargs={"scope": "openid profile email"},
)
