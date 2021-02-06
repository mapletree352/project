package gov.dsta.itms.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// it extracts SiteMinder (SM) headers from requests and add them to responses for AngularJS controllers to send to itms-webservice for authentication 
public class SiteMinderHeaderFilter implements Filter {

	// you may add this header via an interceptor (e.g. Fiddler) to simulate SiteMinder login
	private static final String SM_USER = "SM_USER";

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		String smUser = req.getHeader(SM_USER);
		HttpServletResponse res = (HttpServletResponse) response;
		res.addHeader(SM_USER, smUser);
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void destroy() {

	}

}
